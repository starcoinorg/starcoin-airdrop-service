import {DataTypes, Model} from 'sequelize'
import {Airdrop_projects} from "./airdrop_projects.model.js";

export class Airdrop_records extends Model {
}

export function airdrop_records_init(sequelize) {
    Airdrop_records.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        address: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.BIGINT
        },
        idx: {
            type: DataTypes.INTEGER
        },
        proof: {
            type: DataTypes.STRING
        },
        airdrop_id: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'airdrop_records'
    })

    Airdrop_records.belongsTo(Airdrop_projects, {
        foreignKey: 'airdrop_id',
        targetKey: 'id',
        as: "AP"
    });
}
