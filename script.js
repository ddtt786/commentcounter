import 'https://esm.sh/number-flow'

const flow1 = document.querySelector('#counter1')
const flow2 = document.querySelector('#counter2')
const label1 = document.querySelector('#label1')
const label2 = document.querySelector('#label2')
const badge1 = document.querySelector('#badge1')
const badge2 = document.querySelector('#badge2')
const gapValue = document.querySelector('#gapValue')

let count1 = 0
let count2 = 0

async function fetchPostData() {
  try {
    const response = await fetch("https://dutapiv2.vercel.app/api/getPost?sort=commentsLength&display=2")
    const data = await response.json()
    const posts = data.data.data.discussList.list

    if (posts && posts.length >= 2) {
      const post1 = posts[0]
      const post2 = posts[1]

      label1.textContent = post1.user.nickname
      label2.textContent = post2.user.nickname

      count1 = post1.commentsLength
      count2 = post2.commentsLength

      flow1.update(count1)
      flow2.update(count2)

      updateBadges()
      updateGap()
    }
  } catch (error) {
    console.error('API 호출 오류:', error)
  }
}

function updateBadges() {
  if (count1 > count2) {
    badge1.textContent = '1st'
    badge1.className = 'badge badge-1st'
    badge2.textContent = '2nd'
    badge2.className = 'badge badge-2nd'
  } else if (count2 > count1) {
    badge2.textContent = '1st'
    badge2.className = 'badge badge-1st'
    badge1.textContent = '2nd'
    badge1.className = 'badge badge-2nd'
  } else {
    badge1.textContent = 'tossup'
    badge1.className = 'badge badge-tossup'
    badge2.textContent = 'tossup'
    badge2.className = 'badge badge-tossup'
  }
}

function updateGap() {
  const gap = Math.abs(count1 - count2)
  gapValue.update(gap)
}

fetchPostData()

setInterval(() => {
  fetchPostData()
}, 3000);