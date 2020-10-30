import React, { useState, TransitionEvent } from 'react';
import ft1 from 'assets/images/link/ft1.png';
import ft2 from 'assets/images/link/ft2.png';
import ft3 from 'assets/images/link/ft3.png';
import ft4 from 'assets/images/link/ft4.png';
import ft5 from 'assets/images/link/ft5.png';
import { Carousel } from 'react-responsive-carousel';
import './Slider.css';

// Number of images that have already loaded
let n = 0;

interface IProps {
	setShowPlaceholder: React.Dispatch<React.SetStateAction<boolean>>;
}

function Slider({ setShowPlaceholder }: IProps) {
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [placeholderLoaded, setPlaceholderLoaded] = useState(false);

	const handleImageLoad = () => {
		n++;
		setImagesLoaded(n >= 7);
	};

	const preloaderTransitionEndHandler = (
		e: TransitionEvent<HTMLImageElement>
	) => {
		const targetElement = e.target as HTMLImageElement;
		if (e.propertyName === 'opacity') {
			targetElement.parentElement!.className = '';
			targetElement.remove();
		}
	};

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
			<div
				styleName={`preloader ${placeholderLoaded ? 'mobilePlaceholder' : ''} ${
					imagesLoaded && placeholderLoaded ? 'disabled' : ''
				}`}
			>
				<img
					src="data:image/png;base64,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"
					styleName="img-placeholder"
					alt="placeholder"
					onTransitionEnd={preloaderTransitionEndHandler}
					onLoad={() => {
						setPlaceholderLoaded(true);
						setShowPlaceholder(true);
					}}
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
	);
}

export default Slider;
