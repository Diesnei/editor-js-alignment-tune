import { AlignmentType } from '../types/Alignment';
import { BlockType } from '../types/Block';

export interface IConfig {
    blocks: undefined|BlockType[]
    default: undefined|AlignmentType
}