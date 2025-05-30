import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { PublicEvent } from '../models'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setCurrentEvent } from '../slices/eventsSlice'
import '../App.css' // ← import the new CSS

export type Role = 'participant' | 'admin'

interface HeaderProps {
  role: Role
  onRoleChange: (role: Role) => void
}

export default function Header({ role, onRoleChange }: HeaderProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { events, currentEventId } = useAppSelector(s => s.events)

  const handleSessionClick = (id: number) => {
    dispatch(setCurrentEvent(id))
    const base = role === 'admin' ? '/admin' : ''
    navigate(`${base}/session/${id}`)
  }

  return (
    <header className="header">
      <h1 className="header__title">Live Q&A</h1>

      <div className="header__controls">
        {/* ← role pills */}
        <div className="role-nav">
          <button
            className={`role-nav__btn ${role === 'participant' ? 'active' : ''}`}
            onClick={() => onRoleChange('participant')}
          >
            Participant
          </button>
          <button
            className={`role-nav__btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => onRoleChange('admin')}
          >
            Admin
          </button>
        </div>

        {/* ← session selector */}
        <nav className="session-nav">
          {events.map(evt => (
            <button
              key={evt.id}
              onClick={() => handleSessionClick(evt.id)}
              className={`session-nav__btn ${
                evt.id === currentEventId ? 'active' : 'inactive'
              }`}
            >
              {evt.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
