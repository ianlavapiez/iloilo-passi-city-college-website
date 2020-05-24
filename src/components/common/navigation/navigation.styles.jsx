import styled from 'styled-components'

export const NavigationBackground = styled.div`
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  position: fixed;
  top: 6.5rem;
  right: 6.5rem;
  background-image: radial-gradient($color-primary-light, $color-primary-dark);
  z-index: 1000;
  transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);

  @media only screen and (max-width: 56.25em) {
    top: 4.5rem;
    right: 4.5rem;
  }

  @media only screen and (max-width: 37.5rem) {
    top: 3.5rem;
    right: 3.5rem;
  }
`

export const NavigationContainer = styled.nav`
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1500;

  opacity: 0;
  width: 0;
  transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`

export const NavigationListContainer = styled.ul`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  list-style: none;
  text-align: center;
  width: 100%;
`

export const NavigationListItem = styled.li`
  margin: 1rem;
`

export const NavigationLink = styled.a`
  &:link,
  &:visited {
    display: inline-block;
    font-size: 3rem;
    font-weight: 300;
    padding: 1rem 2rem;
    color: $color-white;
    text-decoration: none;
    text-transform: uppercase;
    background-image: linear-gradient(
      120deg,
      transparent 0%,
      transparent 50%,
      $color-white 50%
    );
    background-size: 220%;
    transition: all 0.4s;

    span {
      margin-right: 1.5rem;
      display: inline-block;
    }

    &:hover,
    &:active {
      background-position: 100%;
      color: $color-primary;
      transform: translateX(1rem);
    }
  }
`

export const NavigationIcon = styled.span`
  position: relative;
  margin-top: 3.5rem;

  &,
  &::before,
  &::after {
    width: 3rem;
    height: 2px;
    background-color: $color-grey-dark-3;
    display: inline-block;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    transition: all 0.2s;
  }

  &::before {
    top: -0.8rem;
  }
  &::after {
    top: 0.8rem;
  }
`

export const NavigationButton = styled.label`
  background-color: $color-white;
  height: 7rem;
  width: 7rem;
  position: fixed;
  top: 6rem;
  right: 6rem;
  border-radius: 50%;
  z-index: 2000;
  box-shadow: 0 1rem 3rem rgba($color-black, 0.1);
  text-align: center;
  cursor: pointer;

  @media only screen and (max-width: 56.25em) {
    top: 4rem;
    right: 4rem;
  }

  @media only screen and (max-width: 37.5rem) {
    top: 3rem;
    right: 3rem;
  }

  &:hover ${NavigationIcon}::before {
    top: -1rem;
  }

  &:hover ${NavigationIcon}::after {
    top: 1rem;
  }
`

export const NavigationCheckbox = styled.input`
  display: none;

  &:checked ~ & {
    transform: scale(80);
  }

  &:checked ~ & {
    opacity: 1;
    width: 100%;
  }

  &:checked + & & {
    background-color: transparent;
  }

  &:checked + & &::before {
    top: 0;
    transform: rotate(135deg);
  }

  &:checked + & &::after {
    top: 0;
    transform: rotate(-135deg);
  }
`
