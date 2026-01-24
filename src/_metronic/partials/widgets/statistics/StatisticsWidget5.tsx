
import React from 'react'
import { KTIcon } from '../../../helpers';
import { Link } from 'react-router-dom';

type Props = {
  className: string
  color: string
  svgIcon: string
  iconColor: string
  title: string
  titleColor?: string
  description: string
  descriptionColor?: string
  url?: string
}

const StatisticsWidget5: React.FC<Props> = ({
  className,
  color,
  svgIcon,
  iconColor,
  title,
  titleColor,
  description,
  descriptionColor,
  url

}) => {
  return (
    <Link to={url ? url : '#'} className={`card bg-${color} hoverable ${className} no-text-decoration`}>
      <div className='card-body'>
        <div className="container py-4">
  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
    <div className='d-flex gap-2'>
        {svgIcon && <KTIcon iconName={svgIcon} className={`text-${iconColor} fs-3x ms-n1`} />}
    <h2 className={`text-${titleColor} fw-bold m-0`}>
      {title}
    </h2>
    </div>
    <p className={`text-${descriptionColor} fw-semibold m-0`}>
      {description}
    </p>
  </div>
</div>

      </div>
    </Link>
  )
}

export { StatisticsWidget5 }
