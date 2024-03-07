"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const UserRecords_1 = require("./UserRecords");
let User = class User {
    updateFolderName() {
        const localPart = this.email.split('@')[0];
        const lettersOnly = localPart.replace(/[^a-zA-Z]/g, ''); // Keeping only letters
        this.folderName = `${lettersOnly}_${this.id}`;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "folderName", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'kondashivaradhan007@gmail.com' }),
    __metadata("design:type", String)
], User.prototype, "backupMegaAcc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 1024.0 }),
    __metadata("design:type", Number)
], User.prototype, "quota", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserRecords_1.UserRecords, (userRecord) => userRecord.user),
    __metadata("design:type", Array)
], User.prototype, "records", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "updateFolderName", null);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
