import { expect, test } from 'bun:test'
import type { Relation } from '@discrete-mathematics'
import {
  isAntiSymmetric,
  isEquivalence,
  isPartialOrder,
  isReflexive,
  isSymmetric,
  isTransitive,
  matrixToRelation,
  reflexiveClosure,
  relationToMatrix,
  transitiveClosure,
  symmetricClosure,
} from '@discrete-mathematics'

test('reflexive closure', () => {
  const elements = ['1', '2', '3', '4', '5']
  const relation: Relation = [
    ['1', '2'],
    ['2', '2'],
    ['2', '3'],
    ['3', '4'],
    ['4', '3'],
  ]

  const expected: Relation = [
    ['1', '1'],
    ['1', '2'],
    ['2', '2'],
    ['2', '3'],
    ['3', '3'],
    ['3', '4'],
    ['4', '3'],
    ['4', '4'],
    ['5', '5'],
  ]

  const rClosure = reflexiveClosure(relation, elements)
  console.log('Original relation: ', relation.sort())
  console.log('Reflexive closure relation: ', rClosure.sort())

  expect(rClosure).toEqual(expected)
})

test('symmetric closure', () => {
  const elements = ['1', '2', '3', '4', '5']
  const relation: Relation = [
    ['1', '2'],
    ['2', '2'],
    ['2', '3'],
    ['3', '4'],
    ['4', '3'],
  ]

  const expected: Relation = [
    ['1', '2'],
    ['2', '1'],
    ['2', '2'],
    ['2', '3'],
    ['3', '2'],
    ['3', '4'],
    ['4', '3'],
  ]

  const sClosure = symmetricClosure(relation)
  console.log('Original relation: ', relation.sort())
  console.log('Symmetric closure relation: ', sClosure.sort())

  expect(sClosure).toEqual(expected)
})

test('transitive closure', () => {
  const elements = ['1', '2', '3', '4', '5']
  const relation: Relation = [
    ['1', '2'],
    ['2', '2'],
    ['2', '3'],
    ['3', '4'],
    ['4', '3'],
  ]

  const expected: Relation = [
    ['1', '2'],
    ['1', '3'],
    ['1', '4'],
    ['2', '2'],
    ['2', '3'],
    ['2', '4'],
    ['3', '3'],
    ['3', '4'],
    ['4', '3'],
    ['4', '4'],
  ]

  const tClosureRelation = matrixToRelation(transitiveClosure(relationToMatrix(relation, elements)), elements)
  console.log('Original relation: ', relation)
  console.log('Transitive closure relation: ', tClosureRelation)

  expect(tClosureRelation).toEqual(expected)
})

test('test properties of set', () => {
  const elements = ['a', 'b', 'c']
  const relation: Relation = [
    ['a', 'a'],
    ['a', 'b'],
    ['b', 'b'],
    ['c', 'a'],
    ['c', 'c'],
  ]

  console.log('Original relation: ', relation)
  console.log('Is reflexive?', isReflexive(relation, elements))
  console.log('Is symmetric?', isSymmetric(relation))
  console.log('Is anti-symmetric?', isAntiSymmetric(relation))
  console.log('Is transitive?', isTransitive(relation))
  console.log('Is equivalence relation?', isEquivalence(relation, elements))
  console.log('Is partial order?', isPartialOrder(relation, elements))
})