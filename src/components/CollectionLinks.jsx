import Link from 'next/link'

import matter from 'gray-matter'
import { join } from 'path'
import { promises as fs } from 'fs'

import ButtonStyle from '@/components/ui/ButtonStyle'

async function getComponents() {
  const componentsPath = join(process.cwd(), '/src/content/components')
  const categoriesPath = join(process.cwd(), '/src/content/categories')

  const categorySlugs = ['application-ui', 'marketing-ui', 'ecommerce-ui']
  const componentSlugs = await fs.readdir(componentsPath)

  const categoriesData = await Promise.all(
    categorySlugs.map(async (categorySlug) => {
      const categoryPath = join(categoriesPath, `${categorySlug}.mdx`)
      const categoryItem = await fs.readFile(categoryPath, 'utf-8')

      const { data: categoryData } = matter(categoryItem)

      return categoryData
    })
  )

  const componentsData = await Promise.all(
    componentSlugs.map(async (componentSlug) => {
      const componentPath = join(componentsPath, componentSlug)
      const componentItem = await fs.readFile(componentPath, 'utf-8')

      const { data: componentData } = matter(componentItem)

      const componentSlugFormatted = componentSlug.replace('.mdx', '')
      const componentSlugTrue = componentSlugFormatted.replace(`${componentData.category}-`, '')
      const componentCount = Object.values(componentData.components).length

      const categoryPath = join(categoriesPath, `${componentData.category}.mdx`)
      const categoryItem = await fs.readFile(categoryPath, 'utf-8')

      const { data: categoryData } = matter(categoryItem)

      return {
        title: componentData.title,
        slug: componentSlugTrue,
        emoji: categoryData.emoji,
        count: componentCount,
        category: componentData.category,
        id: componentSlugFormatted,
      }
    })
  )

  return {
    categoriesData,
    componentsData,
  }
}

export default async function CollectionLinks({ activeCollection, activeCategory }) {
  const { categoriesData, componentsData } = await getComponents()

  return (
    <div>
      <details className="group">
        <summary className="inline-flex cursor-pointer">
          <ButtonStyle>
            <span aria-hidden="true" role="img" className="text-sm">
              <span className="group-open:hidden">🐵</span>
              <span className="hidden group-open:inline">🙈</span>
            </span>

            <span className="text-sm font-medium">
              <span className="group-open:hidden">Show</span>
              <span className="hidden group-open:inline">Hide</span> Collections
            </span>
          </ButtonStyle>
        </summary>

        <div className="pt-6">
          <ul className="flex gap-4">
            {categoriesData.map((categoryData) => (
              <li key={categoryData.title} className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" role="img" className="text-sm">
                  {categoryData.emoji}
                </span>

                <span className="text-sm font-medium text-gray-900">{categoryData.title}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-4 flex gap-1 overflow-auto md:flex-wrap md:overflow-hidden">
            {componentsData.map((componentData) => {
              const buttonText = `${componentData.title} (${componentData.count})`
              const isActive =
                activeCategory === componentData.category && activeCollection === componentData.slug

              return (
                <li key={componentData.id} className="shrink-0 md:shrink">
                  <Link href={`/components/${componentData.category}/${componentData.slug}`}>
                    <ButtonStyle
                      buttonEmoji={componentData.emoji}
                      buttonText={buttonText}
                      buttonActive={isActive}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </details>
    </div>
  )
}