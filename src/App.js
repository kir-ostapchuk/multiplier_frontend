import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import EasyExpressionComponent from "./EasyExpressionComponent";
import MediumExpressionComponent from "./MediumExpressionComponent";
import HardExpressionComponent from "./HardExpressionComponent";

// function App() {
//     return (
//         <div className="App">
//             <header className="App-header">
//
//                 <Form>
//                     <Form.Group controlId="formEmail">
//                         <Form.Label>Email Address</Form.Label>
//                         <Form.Control type="email" placeholder="Example@email.com"/>
//                         <Form.Text className="text-muted">
//                             We'll never share your email address, trust us!
//                         </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="formPassword">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control type="password" placeholder="Password"/>
//                     </Form.Group>
//                     <Button variant="secondary" type="submit">Login</Button>
//                 </Form>
//                 <Breadcrumb>
//                     <Breadcrumb.Item>Test</Breadcrumb.Item>
//                     <Breadcrumb.Item>Test 2</Breadcrumb.Item>
//                     <Breadcrumb.Item active>Test 3</Breadcrumb.Item>
//                 </Breadcrumb>
//                 <Alert variant="secondary">This is a Button</Alert>
//                 <Button>Test Button</Button>
//             </header>
//         </div>
//     );
// }

function App() {
    return (
    //     <div>
    //         <header className="container col-lg-6 col-md-8 col-sm-10">
    //             <MathExpressionComponent />
    //             <LevelChangerComponent />
    //         </header>
    //     </div>
    // );
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/easy">Easy</Link>
                        </li>
                        <li>
                            <Link to="/medium">Medium</Link>
                        </li>
                        <li>
                            <Link to="/hard">Hard</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/easy">
                        <EasyExpressionComponent />
                    </Route>
                    <Route path="/medium">
                        <MediumExpressionComponent />
                    </Route>
                    <Route path="/hard">
                        <HardExpressionComponent />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
