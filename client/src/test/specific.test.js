import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Specific from '../components/Specific';
import AddCart from './AddCart';
import AddLike from './AddLike';

const mockData = {
    attributes: {
        id: 95,
        amount: 3,
        maxCapacity: 40,
        course_syllabus: null,
        likeCount: 4,
        price: 3000,
        title: 'A-level',
        description: 'lesson',
        entries : {
          data:[{
            attributes:{
                cart: null,
                enroll: null,
                like: null
            }
            }]
        },
    }
}

describe('Specific', () => {
    test("renders data", () => {
        render(<Specific data={mockData} />);

        //ตรวจข้อมูลว่าแสดงหรือไม่
        const title = screen.getByText(/A-level/);
        expect(title).toBeInTheDocument();

        const describtion = screen.getByText(/lesson/);
        expect(describtion).toBeInTheDocument();

        const price = screen.getByText(/3000/);
        expect(price).toBeInTheDocument();
    });
    describe('AddCart component', () => {
        it('calls addToCart function', () => {
            const onResponse = jest.fn();

            const { getByAltText } = render(<AddCart course={mockData} onResponse={onResponse} />);

            // ค้นหา element ของไอคอน
            const addIcon = getByAltText('Add Icon');
            fireEvent.click(addIcon);

            // ตรวจสอบ popup ที่แสดง
            const popup = queryByRole('dialog');
            expect(popup).toBeInTheDocument();
        });
    });

    describe('AddLike component', () => {
        it('calls addTolike function', () => {

            const { getByAltText } = render(<AddLike course={mockData} />);

            // ค้นหา element ของไอคอน
            const likeIcon = getByAltText('Like Icon');
            fireEvent.click(likeIcon);

            // ตรวจสอบ popup ที่แสดง
            const popup = queryByRole('dialog');
            expect(popup).toBeInTheDocument();
        });
    });

});
