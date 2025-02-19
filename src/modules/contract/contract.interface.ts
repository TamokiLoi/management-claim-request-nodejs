import { Document } from 'mongoose';
import { IBase } from '../../core/interfaces';
import { ContractFieldName } from './contract.enum';

export interface IContract extends Document, IBase {
    [ContractFieldName.ID]: string;
    [ContractFieldName.CONTRACT_TYPE]: string;
    [ContractFieldName.DESCRIPTION]: string;
}
