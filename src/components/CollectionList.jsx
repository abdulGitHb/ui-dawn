'use client'

import ComponentPreview from '@/components/preview/ComponentPreview'

export default function CollectionList({ componentsData, componentContainer }) {
  console.log("Inside collectionlist")
  return (
    <div className="not-prose mx-auto xl:max-w-[1348px]">
      <ul className="space-y-8 lg:space-y-12">
        {componentsData.map((componentData) => (
          <li key={componentData.id}>
            <ComponentPreview
              componentData={componentData}
              componentContainer={componentContainer}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}