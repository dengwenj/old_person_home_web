import React from 'react'

import { useNavigate } from 'react-router-dom';

export default function OldPerson() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/home')}>OldPerson</div>
  )
}
