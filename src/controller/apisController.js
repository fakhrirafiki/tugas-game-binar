const fs = require('fs');
const path = require('path');
const databaseEmail = require('../database/dataBaseEmail.json');
const gameHistoriesDB = require('../database/gameHistories.json');

const emailFilePath = path.resolve(__dirname, '../database/dataBaseEmail.json');
const historiesFilePath = path.resolve(__dirname, '../database/gameHistories.json');


class ApisController {
    static postGameHistory = (req, res) => {
        gameHistoriesDB.push(req.body)

        return fs.writeFile(
            historiesFilePath,
            JSON.stringify(gameHistoriesDB),
            'utf-8',
            () => res.status(201).json({ message: `Game Histories Successfully saved on ${historiesFilePath}` }),
        )
    }

    static postEmail = (req, res) => {
        const { email } = req.body
        const isEmailExisted = databaseEmail.find((obj) => obj.email === email)

        if (isEmailExisted) {
            return res.status(400).json({ message: 'email is already exist' })
        }

        databaseEmail.push(req.body)



        return fs.writeFile(
            emailFilePath,
            JSON.stringify(databaseEmail),
            'utf-8',
            () => res.status(201).json({ message: `Successfully saved on ${emailFilePath}` }),
        )
    }
}


module.exports = ApisController;
