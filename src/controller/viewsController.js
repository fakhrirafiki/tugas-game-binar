const statisticData = require('../database/gameHistories.json')
const summaryStat = require('./module-function/getSummaryStatistic')

class ViewsController {

    static getHistoryView = (req, res) => {
        res.render(
            'history',
            {
                statisticData: statisticData,
                summaryStat: summaryStat
            }

        )
    }
    static getIndexView = (req, res) => {
        res.render(
            'index'
        )
    }

    static getGameView = (req, res) => {
        res.render(
            'indexGame'
        )
    }
}

module.exports = ViewsController;
