/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs').promises
const matter = require('gray-matter')
const dayjs = require('dayjs')

const updateFrontmatter = async () => {
  const [, , ...mdFilePaths] = process.argv
  console.log('mdFilePaths',mdFilePaths)
  mdFilePaths.forEach(async (path) => {
    const file = matter.read(path)
    const { data: currentFrontmatter } = file
    const updatedFrontmatter = {
      ...currentFrontmatter,
      date: dayjs(currentFrontmatter.date || Date.now()).format('YYYY-MM-DD'),
      createdOn:
        currentFrontmatter.createdOn ||
        new Date(currentFrontmatter.date || Date.now()).getTime(),
      updatedOn: new Date().getTime()
    }
    file.data = updatedFrontmatter
    const updatedFileContent = matter.stringify(file)
    fs.writeFile(path, updatedFileContent)
    // }
  })
}

updateFrontmatter()