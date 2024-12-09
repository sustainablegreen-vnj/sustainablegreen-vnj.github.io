/*!
 * Libmcarousel
 * A fork of Continuous Carousel ∞ v0.2.1 modified to scroll on demand.
 * 
 * 
 * A fork of Continuous Carousel ∞ v0.2.1
 * Continuous carousel that uses vanilla JavaScript & CSS animations.
 *
 * @author MXPSQL Server 20953 Onetechguy, Jon Chretien
 * @license Released under the MIT license.
 */

(() => {
    'use strict';

    // permited directions
    const DIRECTION_HORIZONTAL = 'horizontal'; 
    const DIRECTION_VERTICAL = 'vertical';
    // Classes needed
    const CLASS_NAME_GROUP = '.m-carousel-group';
    const CLASS_NAME_HIDDEN = 'm-carousel-visuallyhidden';
    const CLASS_NAME_ITEM = '.m-carousel-item';
    const CLASS_NAME_LIVE_REGION = 'm-carousel-liveregion';
    // Data attributes for html configuration
    const SELECTOR_DIRECTION = 'data-direction';
    const SELECTOR_NUM_VISIBLE = 'data-num-visible';
    // CSS configuration
    const TRANSITION_DURATION_INITIAL = '1s';
    const TRANSITION_DURATION_RESET = '0.001s';

    function MCarousel(element, udirection=null, nvisible=null) { // Constructor with default args. By default udirection is null, which means take from the data attribute.
        let deez = this; // Used for inner function purposes

        let activeSlideIndex = 1;
        let position = 0;

        const container = element; // Container is element
        const direction = udirection || container
            .getAttribute(SELECTOR_DIRECTION)
            .toLowerCase()
            .trim(); // Either fetch from args or element
        const numVisible = Number(
            nvisible || container.getAttribute(SELECTOR_NUM_VISIBLE).trim()
        ); // Fetch from args or element attribute
        const items = Array.from(container.querySelectorAll(CLASS_NAME_ITEM) || []);
        const itemGroup = container.querySelector(CLASS_NAME_GROUP);
        const itemsLength = items.length;
        const itemGroupTransform = {
            [DIRECTION_HORIZONTAL]: function(position) {
                return `translate3d(${position}px, 0, 0)`;
            },
            [DIRECTION_VERTICAL]: function(position) {
                return `translate3d(0, ${position}px, 0)`;
            },
        };

        itemGroup.style.transitionDuration = TRANSITION_DURATION_INITIAL;

        function insertLiveRegion() {
            const liveRegion = document.createElement('div');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.setAttribute('class', `${CLASS_NAME_LIVE_REGION} ${CLASS_NAME_HIDDEN}`);
            container.appendChild(liveRegion);
        }

        function updateLiveRegion() {
            container.querySelector(`.${CLASS_NAME_LIVE_REGION}`).textContent = `Item ${
          activeSlideIndex
        } of ${itemsLength}`;
        }

        function cloneNodes() { // Creaye fragments for elements
            const fragment = document.createDocumentFragment();

            items.slice(0, numVisible).forEach((item) => {
                const node = item.cloneNode(true);
                fragment.appendChild(node);
            });

            itemGroup.appendChild(fragment);
        }

        function animateContainer(measurement, direction) {
            let endPosition = -(measurement * itemsLength);
            let isBypassingTimer = false;
            let isReadyToReset = false;

            function animate(incre=true) { // Animate
                let timer = isBypassingTimer ? 100 : 2000;

                if (position === endPosition) { // If position is at the end
                    isReadyToReset = true;
                    isBypassingTimer = true;
                    activeSlideIndex = 1;
                }

                if (position !== endPosition) { // If position is not at the end
                    isBypassingTimer = false;
                }

                // normal animation
                if (!isReadyToReset) {
                    position = position - measurement * numVisible * (incre ? 1 : -1);
                    itemGroup.style.transitionDuration = TRANSITION_DURATION_INITIAL;
                }

                if (position === endPosition || position >= 0) { // If position is at the end
                    isReadyToReset = true;
                    isBypassingTimer = true;
                    activeSlideIndex = 1;
                }

                // reset container position & bypass timer
                if (isReadyToReset) {
                    isReadyToReset = false;
                    position = 0;
                    itemGroup.style.transitionDuration = TRANSITION_DURATION_RESET;
                }

                console.log(position);
                itemGroup.style.transform = itemGroupTransform[direction](position);
                updateLiveRegion();
            }

            deez.incrementSlide = function() {
                if (activeSlideIndex >= itemsLength) {
                    activeSlideIndex = 1;
                } else {
                    activeSlideIndex++;
                }

                animate(true);

                return activeSlideIndex;
            }

            deez.decrementSlide = function(){
                if (activeSlideIndex <= 1) {
                    activeSlideIndex = itemsLength;
                } else {
                    activeSlideIndex--;
                }

                animate(false);

                return activeSlideIndex;
            }

            deez._animate = animate;

            updateLiveRegion();
        }

        function setHorizontalLayout() {
            // set item widths
            const containerWidth = container.offsetWidth;
            const itemWidth = containerWidth / numVisible;

            // set item group width
            itemGroup.setAttribute(
                'style',
                `width: ${itemWidth * (itemsLength + numVisible)}px`
            );
            items.forEach((item) => {
                item.setAttribute('style', `width: ${itemWidth}px`);
            });

            return {
                itemWidth
            };
        }

        function setVerticalLayout() {
            // set item height
            const containerHeight = container.offsetHeight;
            const itemHeight = containerHeight / numVisible;

            // set item group height
            itemGroup.setAttribute(
                'style',
                `height: ${itemHeight * (itemsLength + numVisible)}px`
            );
            items.forEach((item) => {
                item.setAttribute('style', `height: ${itemHeight}px`);
            });

            return {
                itemHeight
            };
        }

        deez.container = container;
        deez.direction = direction;

        deez.getSlideIndex = function () {
            return activeSlideIndex;
        }
        deez.getSlideCount = function() {
            return itemsLength;
        }

        switch (direction) {
            case DIRECTION_HORIZONTAL: {
                const {
                    itemWidth
                } = setHorizontalLayout();
                cloneNodes();
                insertLiveRegion();
                animateContainer(itemWidth, DIRECTION_HORIZONTAL);
                break;
            }
            case DIRECTION_VERTICAL: {
                const {
                    itemHeight
                } = setVerticalLayout();
                cloneNodes();
                insertLiveRegion();
                animateContainer(itemHeight, DIRECTION_VERTICAL);
                break;
            }
            default: {
                throw new Error(
                    `Direction must be either ${DIRECTION_VERTICAL} or ${DIRECTION_HORIZONTAL}`
                );
            }
        }
    }

    /**
     * Expose `MCarousel`.
     */
    if (typeof define === 'function' && define.amd) {
        define(MCarousel);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = MCarousel;
    } else {
        window.MCarousel = MCarousel;
    }
})();