import { IImageComponent } from "../../interface/image.interface"

const ImageComponent = ({ src, alt, className }: IImageComponent) => {
  return (
    <img src={src} alt={alt} className={className} loading="lazy" />
  )
}

export default ImageComponent