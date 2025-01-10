import { BaseFieldName } from "../enums";

export interface IBase {
    [BaseFieldName.CREATED_AT]?: Date; // default new Date()
    [BaseFieldName.UPDATED_AT]?: Date; // default new Date()
    [BaseFieldName.IS_DELETED]?: boolean; // flag for soft delete, default is false
}
