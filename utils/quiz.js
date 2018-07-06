var articles = require('../models/article'),
    users = require('../models/user'),
    results = require('../models/result');
/**
 * Finds all the questions in the quiz history collection for the user for today.
 * Returns a count of all matching quiz history items.
 *
 * @param {String} user ID.
 * @param {Function} callback.
 * @api public
 */

function findUserQuestionsForToday(user_id, fn) {
    var start_day = new Date();
    start_day.setHours(0, 0, 0, 0);
    results.Result.count({
        user_id: user_id,
        date: {
            $gte: start_day
        }
    }, function(err, count) {
        if (err) throw err;
        return fn(null, count);
    });
}

/**
 * Finds next question to display to user.
 * Returns the full Question document and total number of questions today.
 *
 * @param {String} nth question to display sorted by date.
 * @param {Function} callback.
 * @api public
 */

function findNextQuestion(index, fn) {
    var start_day = new Date();
    start_day.setHours(0, 0, 0, 0);
    var query = models.Question.find({
        date: {
            $gte: start_day
        }
    });
    query.sort({
        date: 1
    });
    query.exec(function(err, questions) {
        if (err) throw err;
        if (questions.length == 0) {
            //No quiz today!
            return fn(new Error('No Questions Available'), null, null);
        }
        if (index >= questions.length) {
            //No more questions in the quiz!
            return fn(null, null, null);
        } else {
            return fn(null, questions[index], questions.length);
        }
    });
}


function getResults(user_id, start_day, fn) {
    var results = [],
        total_points = 0,
        total_questions = 0,
        total_response_time = 0;
    var to_find = {
        user_id: user_id,
        date: {
            $gte: start_day
        }
    };
    if (!start_day) {
        delete to_find.date;
    }
    var history_query = models.QuizHistory.find(to_find);
    history_query.sort({
        date: 1
    });
    history_query.populate('question'); //Mongo equivalent of a RDBMS JOIN. Isn't she beautiful?!
    history_query.select('question choice_id response_time');
    history_query.lean();
    history_query.exec(function(err, questions) {
        var correct_answer = false;
        if (questions !== undefined) {
            questions.forEach(function(item, index, array) {
                total_questions++;
                if (item.question.answer == item.choice_id) {
                    correct_answer = true;
                    total_points++;
                } else {
                    correct_answer = false;
                }
                results[index] = {
                    'question_title': item.question.title,
                    'answer_title': item.question.choices[item.question.answer].choice_text,
                    'correct_answer': correct_answer,
                    'answer': item.question.answer,
                    'answer_chosen': item.choice_id,
                    'response_time': item.response_time
                };
                total_response_time += item.response_time;
            });
        } else {
            return fn(null, null);
        }
        results['total_points'] = total_points;
        results['total_questions'] = total_questions;
        results['avg_response_time'] = (total_response_time / total_questions).toFixed(3); //Round off to 3 decimals.
        return fn(null, results);
    });
}
module.exports = {
    findUserQuestionsForToday: findUserQuestionsForToday,
    findNextQuestion: findNextQuestion,
    getResults: getResults
}