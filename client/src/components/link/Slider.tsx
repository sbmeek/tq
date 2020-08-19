import React, { useState, TransitionEvent } from 'react'
import __ft1Thumbnail from 'assets/images/link/__ft1Thumbnail.jpg'
import ft1 from 'assets/images/link/ft1.png'
import ft2 from 'assets/images/link/ft2.png'
import ft3 from 'assets/images/link/ft3.png'
import ft4 from 'assets/images/link/ft4.png'
import ft5 from 'assets/images/link/ft5.png'
import { Carousel } from 'react-responsive-carousel'
import './Slider.css'

// Number of images that have already loaded
let n = 0;

interface IProps{
    setShowPlaceholder: React.Dispatch<React.SetStateAction<boolean>>
}

function Slider({ setShowPlaceholder }: IProps) {
	const [imagesLoaded, setImagesLoaded] = useState(false)
    const [placeholderLoaded, setPlaceholderLoaded] = useState(false)

	const handleImageLoad = () => {
        n++;
		setImagesLoaded(n >= 7)
	}

	const preloaderTransitionEndHandler = (
		e: TransitionEvent<HTMLImageElement>
	) => {
		const targetElement = e.target as HTMLImageElement
		if (e.propertyName === 'opacity') {
			targetElement.parentElement!.className = ''
			targetElement.remove()
		}
	}

	return (
		<Carousel
			infiniteLoop={true}
			autoPlay={imagesLoaded}
			interval={2000}
			showStatus={false}
			showThumbs={false}
			showArrows={imagesLoaded}
			showIndicators={imagesLoaded}
		>
            <div styleName={`preloader ${placeholderLoaded ? 'mobilePlaceholder'  : ''} ${imagesLoaded && placeholderLoaded ? 'disabled' : ''}`}>
                <img
                    src={__ft1Thumbnail}
                    styleName="img-placeholder"
                    alt="placeholder"
                    onTransitionEnd={preloaderTransitionEndHandler}
                    onLoad={() => { setPlaceholderLoaded(true); setShowPlaceholder(true);}}
                />
                <img
                    src={ft1}
                    alt="ft1"
                    styleName={`imgFt1 ${!imagesLoaded ? 'loading' : ''}`}
                    onLoad={() => handleImageLoad()}
                />
            </div>
			<div>
				<img
					src={ft2}
					styleName={!imagesLoaded ? 'loading' : ''}
					alt="ft2"
					onLoad={() => handleImageLoad()}
				/>
			</div>
			<div>
				<img
					src={ft3}
					styleName={!imagesLoaded ? 'loading' : ''}
					alt="ft3"
					onLoad={() => handleImageLoad()}
				/>
			</div>
			<div>
				<img
					src={ft4}
					styleName={!imagesLoaded ? 'loading' : ''}
					alt="ft4"
					onLoad={() => handleImageLoad()}
				/>
			</div>
			<div>
				<img
					src={ft5}
					styleName={!imagesLoaded ? 'loading' : ''}
					alt="ft5"
					onLoad={() => handleImageLoad()}
				/>
			</div>
		</Carousel>
	)
}

export default Slider
