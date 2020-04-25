# frozen_string_literal: true

require 'rails_helper'

RSpec.feature 'HomepageFlows', type: :feature do
  describe 'homepage' do
    let!(:user) { FactoryBot.create(:user) }
    context 'when the user is anonymous' do
      it 'renders a page with a link to the sign up form' do
        visit authenticated_root_path
        expect(page).to have_content('Ruby on rails + React Example')
        expect(page).to have_current_path(root_path)
      end
    end
    context 'when the user is authenticated' do
      it 'renders a page with their todo items' do
        sign_in user
        visit authenticated_root_path
        expect(page).to have_content('Simple TODO List')
        expect(page).to have_current_path(authenticated_root_path)
      end
    end
  end
end
