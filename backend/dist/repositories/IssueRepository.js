"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueRepository = void 0;
const IssueModel_1 = require("../models/IssueModel");
const mongoose_1 = require("mongoose");
class IssueRepository {
    // CREATE
    async create(data) {
        return IssueModel_1.IssueModel.create(data);
    }
    // FIND BY ID
    async findById(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id))
            return null;
        return IssueModel_1.IssueModel.findById(id);
    }
    // LIST WITH FILTERS
    async find(filters) {
        const query = {
            userId: filters.userId,
            isDeleted: false,
        };
        if (filters.type)
            query.type = filters.type;
        if (filters.status)
            query.status = filters.status;
        if (filters.search) {
            query.$or = [
                { title: { $regex: filters.search, $options: "i" } },
                { description: { $regex: filters.search, $options: "i" } },
            ];
        }
        return IssueModel_1.IssueModel.find(query).sort({ createdAt: -1 });
    }
    // UPDATE
    async update(id, data) {
        if (!mongoose_1.Types.ObjectId.isValid(id))
            return null;
        return IssueModel_1.IssueModel.findByIdAndUpdate(id, data, {
            new: true,
        });
    }
}
exports.IssueRepository = IssueRepository;
