import { IconAlignLeft } from '@codexteam/icons';
import { IconAlignCenter } from '@codexteam/icons';
import { IconAlignRight } from '@codexteam/icons';
import { IconAlignJustify } from '@codexteam/icons';
import { IData } from './interfaces/Data';
import { IAlignment } from './interfaces/Alignment';
import { IStyles } from './interfaces/Styles';
import { IConfig } from './interfaces/Config';
import { AlignmentType } from './types/Alignment';
import './styles/main.scss';
import { BlockType } from './types/Block';

export default class AlignmentTune {
    api: any;
    data: IData;
    config: IConfig;
    block: any;
    alignments: IAlignment[];
    wrapper: HTMLDivElement;
    styles: IStyles;

    static readonly DEFAULT_ALIGNMENT: AlignmentType = 'left';

    static get isTune(): boolean {
        return true;
    }

    getDefaultAlignment(): AlignmentType {
        // Get the current block settings
        const blockSettings = this.getCurrentBlockSettings();
        // If a custom default alignment is provided
        if (blockSettings && blockSettings.default) {
            // Use it
            return blockSettings.default;
        }

        // If a custom default alignment is provided
        if (this.config.default) {
            // Use it
            return this.config.default;
        }

        // Otherwise, use the default class alignment
        return AlignmentTune.DEFAULT_ALIGNMENT;
    }

    getAvailableBlockAlignments(): IAlignment[] {
        // Se all available alignments
        const allAlignments: IAlignment[] = [
            {
                name: 'left',
                icon: IconAlignLeft
            },
            {
                name: 'center',
                icon: IconAlignCenter
            },
            {
                name: 'right',
                icon: IconAlignRight
            },
            {
                name: 'justify',
                icon: IconAlignJustify
            }
        ];

        // Get the current block settings
        const blockSettings = this.getCurrentBlockSettings();
        // If custom available alignments are provided
        if (blockSettings && blockSettings.availableAlignments) {
            // Creates a new available alignments list
            const availableAlignments: IAlignment[] = [];

            // For each desired block alignment
            blockSettings.availableAlignments.forEach(availableAlignment => {
                // Finds the respective alignment object
                const alignment = allAlignments.find(targetAlignment => targetAlignment.name === availableAlignment);
                // If exists
                if (alignment) {
                    // Push it to the available alignments list
                    availableAlignments.push(alignment);
                }
            });
            
            // If at least one valid alignment is provided
            if (availableAlignments.length > 0) {
                // Returns the custom alignments
                return availableAlignments;
            }
            
            // Otherwise returns the full list
            return allAlignments;
        }

        // Otherwise returns the full list
        return allAlignments;
    }

    getCurrentBlockSettings(): null|BlockType {
        if (this.config.blocks) {
            const blockSettings = this.config.blocks[this.block.name]
            if (blockSettings) {
                return blockSettings;
            };
        }
        return null;
    }

    constructor({
        api,
        data,
        config,
        block
    }: {
        api: any,
        data: undefined|IData,
        config: any,
        block: any
    }) {
        this.api = api;
        this.block = block;
        this.config = config;

        // Set de default alignment
        this.data = data ?? { alignment: this.getDefaultAlignment() };
        
        // Set the available alignments
        this.alignments = this.getAvailableBlockAlignments();

        // Set the style classnames property
        this.styles = {
            base: 'cdx-alignment-tune',
            alignment: {
                left: 'cdx-alignment-tune--left',
                center: 'cdx-alignment-tune--center',
                right: 'cdx-alignment-tune--right',
                justify: 'cdx-alignment-tune--justify',
            }
        }

        // Creates the "blockContent" wrapper container
        this.wrapper = document.createElement('div');
    }

    wrap(blockContent: Node) {
        // Adds the base class to the wrapper
        this.wrapper.classList.add(this.styles.base);
        // Adds the default alignment set on the "config" property
        this.wrapper.classList.add(this.styles.alignment[this.data.alignment]);
        // Wrap "blockContent"
        this.wrapper.append(blockContent);
        return this.wrapper;
    }

    render() {
        // Creates the tool container
        const container = document.createElement('div');

        // For each alignment
        this.alignments.forEach((alignment, index) => {
            // Creates a button
            const button = document.createElement('button');
            button.classList.add(this.api.styles.settingsButton);
            button.innerHTML = alignment.icon;
            button.type = 'button';

            // If the current alignment name matches the current block alignment
            if (alignment.name === this.data.alignment) {
                // Defines the current button as the selected one
                button.classList.add(this.api.styles.settingsButtonActive);
            }

            // Add a "click" event listener to the current button
            button.addEventListener('click', () => {
                // Store the current block alignment
                const currentAlignment = this.data.alignment;
                // Store the new block alignment
                const newAlignment = this.alignments[index].name;

                // Defines the new alignment for the block
                this.data = { alignment: newAlignment };

                // Trigger the editors change event
                this.block.dispatchChange();

                // Remove the previous selected button highlight
                container.querySelector(`button.${this.api.styles.settingsButton}.${this.api.styles.settingsButtonActive}`)
                    ?.classList.remove(this.api.styles.settingsButtonActive);

                // Set the current button as the selected one
                button.classList.add(this.api.styles.settingsButtonActive);

                // Changes the wrapper container class
                this.wrapper.classList.remove(this.styles.alignment[currentAlignment]);
                this.wrapper.classList.add(this.styles.alignment[newAlignment]);
            });
        
            // Append the button to the container
            container.appendChild(button);
        });
        
        return container;
    }

    save() {
        return this.data;
    }
}