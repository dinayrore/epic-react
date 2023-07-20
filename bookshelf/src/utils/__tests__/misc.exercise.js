import { formatDate } from '../misc'

describe('formatDate', () => {
    test('formatDate formats the date to look nice', () => {
        expect(formatDate(new Date('December 12, 2023'))).toBe('Dec 23')

    })

})