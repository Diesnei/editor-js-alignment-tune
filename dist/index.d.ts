import { IData } from './interfaces/Data';
import { IAlignment } from './interfaces/Alignment';
import { IStyles } from './interfaces/Styles';
import { IConfig } from './interfaces/Config';
import { AlignmentType } from './types/Alignment';
import './styles/main.scss';
import { BlockType } from './types/Block';
export default class AlignmentTune {
    #private;
    api: any;
    data: IData;
    config: IConfig;
    block: any;
    alignments: IAlignment[];
    wrapper: HTMLDivElement;
    styles: IStyles;
    static readonly DEFAULT_ALIGNMENT: AlignmentType;
    static get isTune(): boolean;
    getDefaultAlignment(): AlignmentType;
    getAvailableBlockAlignments(): IAlignment[];
    getCurrentBlockSettings(): null | BlockType;
    constructor({ api, data, config, block }: {
        api: any;
        data: undefined | IData;
        config: any;
        block: any;
    });
    wrap(blockContent: Node): HTMLDivElement;
    render(): HTMLDivElement;
    save(): IData;
}
//# sourceMappingURL=index.d.ts.map