import { h, render } from 'preact';
import 'preact/devtools';
import App from './App.js';
import './index.css';

console.log('here');

render(<App />, document.getElementById('root'));
