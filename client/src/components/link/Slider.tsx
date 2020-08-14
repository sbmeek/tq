import React, { useState } from 'react'
import ft1 from '../../assets/images/link/ft1.png'
import ft2 from '../../assets/images/link/ft2.png'
import ft3 from '../../assets/images/link/ft3.png'
import ft4 from '../../assets/images/link/ft4.png'
import ft5 from '../../assets/images/link/ft5.png'

import { Carousel } from 'react-responsive-carousel'
import './Slider.css'
// Number of images that have already loaded
let n = 0

function Slider() {
	const [imagesLoaded, setImagesLoaded] = useState(false)

	const handleImageLoad = () => {
		n++
		setImagesLoaded(n >= 7)
	}

	return (
		<Carousel
			infiniteLoop={true}
			autoPlay={false}
			interval={2000}
			showStatus={false}
			showThumbs={false}
		>
			<div>
				{!imagesLoaded && <div styleName="preloader"></div>}
				<img
					src={ft1}
					alt="ft1"
					styleName={!imagesLoaded ? 'loading' : ''}
					onLoad={() => handleImageLoad()}
				/>
			</div>
			<div>
				{!imagesLoaded && <div styleName="preloader"></div>}
				<img
					src={ft2}
					styleName={!imagesLoaded ? 'loading' : ''}
					alt="ft2"
					onLoad={() => handleImageLoad()}
				/>
			</div>
			<div>
				{!imagesLoaded && <div styleName="preloader"></div>}
				<img
					src={ft3}
					styleName={!imagesLoaded ? 'loading' : ''}
					alt="ft3"
					onLoad={() => handleImageLoad()}
				/>
			</div>
			<div>
				{!imagesLoaded && <div styleName="preloader"></div>}
				<img
					src={ft4}
					styleName={!imagesLoaded ? 'loading' : ''}
					alt="ft4"
					onLoad={() => handleImageLoad()}
				/>
			</div>
			<div>
				{!imagesLoaded && <div styleName="preloader"></div>}
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
