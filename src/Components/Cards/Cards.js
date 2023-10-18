import React from 'react'
import "./card.css";
import {Card, Row } from 'antd';
import Button from '../Button/Button';


function Cards({showIncomeModal,showExpenseModal}) {
  return (
    <div>
        <Row className='my_row'>
        {/* <Card className='my_card' title="Title"> */}
            <Card className='my_card'>
                <h2>Current Balance</h2>
                <p>$0</p>
                <Button text="Reset Balance" blue={true}/>
            </Card> 
            <Card className='my_card'>
                <h2>Total Income</h2>
                <p>$0</p>
                <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
            </Card> 
            <Card className='my_card'>
                <h2>Total Expenses</h2>
                <p>$0</p>
                <Button text="Add Expenses" blue={true} onClick={showExpenseModal}/>
            </Card>
        </Row>
    </div>
  )
}

export default Cards