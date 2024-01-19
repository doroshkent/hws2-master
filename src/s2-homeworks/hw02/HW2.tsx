import React, { useState } from 'react'
import Affairs from './affairs/Affairs'
import s2 from '../../s1-main/App.module.css'

export type AffairPriorityType = 'low' | 'middle' | 'high'
export type AffairType = {
  _id: number
  name: string
  priority: AffairPriorityType
}
export type FilterType = 'all' | AffairPriorityType

const defaultAffairs: AffairType[] = [
  { _id: 1, name: 'React', priority: 'high' }, // студенты могут изменить содержимое name и количество элементов в массиве, ...priority не менять!
  { _id: 2, name: 'anime', priority: 'low' },
  { _id: 3, name: 'games', priority: 'low' },
  { _id: 4, name: 'work', priority: 'high' },
  { _id: 5, name: 'html & css', priority: 'middle' },
]

export const filterAffairs = (affairs: AffairType[], filter: FilterType): AffairType[] => {
  switch (filter) {
    case 'low':
      return affairs.filter( a => a.priority === 'low' );
    case 'middle':
      return affairs.filter( a => a.priority === 'middle' );
    case 'high':
      return affairs.filter( a => a.priority === 'high' );
    default:
      return affairs
  }
}
export const deleteAffair = (affairs: AffairType[], _id: number): AffairType[] => {
  return affairs.filter( a => a._id !== _id );
}

function HW2() {
  const [ affairs, setAffairs ] = useState<AffairType[]>( defaultAffairs )
  const [ filter, setFilter ] = useState<FilterType>( 'all' )

  const filteredAffairs = filterAffairs( affairs, filter )
  const deleteAffairCallback = (_id: number) => { // need to fix any
    setAffairs( deleteAffair( affairs, _id ) );
  }

  return (
    <div id={ 'hw2' }>
      <div className={ s2.hwTitle }>Homework #2</div>
      <div className={ s2.hw }>
        <Affairs
          data={ filteredAffairs }
          setFilter={ setFilter }
          deleteAffairCallback={ deleteAffairCallback }
          filter={ filter }
        />
      </div>
    </div>
  )
}

export default HW2
