import { render, screen } from '@testing-library/vue'
import MainNav from '@/components/MainNav.vue'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('MainNav', () => {
  it('displays company name', () => {
    render(MainNav)
    const companyName = screen.getByText('Reinvent Careers')
    expect(companyName).toBeInTheDocument()
  })

  it('displays menu items to user', () => {
    render(MainNav)
    const navigationMenuItems = screen.getAllByRole('listitem')
    const navigationMenuTexts = navigationMenuItems.map((item) => item.textContent)
    expect(navigationMenuTexts).toEqual([
      'Teams',
      'Locations',
      'Life at Reinvent',
      'How we hire',
      'Students',
      'Jobs'
    ])
  })

  describe('when the user logs in', () => {
    it('Display user profile picture', async () => {
      // render Main Nav onto the test
      render(MainNav)
      // get object in the DOM
      let profileImage = screen.queryByRole('img', {
        name: /user profile image/i
      })
      // expect it not to be displayed
      expect(profileImage).not.toBeInTheDocument()
      // get object in the DOM
      const loginButton = screen.getByRole('button', {
        name: /sign in/i
      })
      // simulate user click
      await userEvent.click(loginButton)
      // get object in the DOM
      profileImage = screen.getByRole('img', {
        name: /user profile image/i
      })
      // expect it to be displayed
      expect(profileImage).toBeInTheDocument()
    })
  })
})
