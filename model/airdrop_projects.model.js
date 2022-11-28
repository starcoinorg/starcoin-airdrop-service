import {DataTypes, Model} from 'sequelize'


export class Airdrop_projects extends Model {
}

export function airdrop_projects_init(sequelize) {
    Airdrop_projects.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        project: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        name_en: {
            type: DataTypes.STRING
        },
        token: {
            type: DataTypes.STRING
        },
        token_icon: {
            type: DataTypes.STRING
        },
        token_symbol: {
            type: DataTypes.STRING
        },
        token_precision: {
            type: DataTypes.INTEGER
        },
        total_amount: {
            type: DataTypes.BIGINT
        },
        valid_amount: {
            type: DataTypes.BIGINT
        },
        start_at: {
            type: DataTypes.DATE
        },
        end_at: {
            type: DataTypes.DATE
        },
        owner_address: {
            type: DataTypes.STRING
        },
        root: {
            type: DataTypes.STRING
        },
        network_version: {
            type: DataTypes.INTEGER
        },
        chain: {
            type: DataTypes.STRING
        },
        create_at: {
            type: DataTypes.DATE
        },
        update_at: {
            type: DataTypes.DATE
        }
    }, {

        sequelize,
        timestamps: false,
        modelName: 'airdrop_projects'
    })
}
