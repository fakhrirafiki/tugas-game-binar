const statisticData = require('../database/gameHistories.json')

class ViewsController {

    static getHistoryView = (req, res) => {
        res.render(
            'history',
            {
                statisticData: statisticData
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
