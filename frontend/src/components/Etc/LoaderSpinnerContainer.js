import React, {Component} from 'react'
import Loader from "react-loader-spinner";

class LoaderSpinnerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            active: false
        }
    }

    componentDidMount() {
        window.progressbar1 = this // 중요, window 전역에 ProgressContainer 할당
    }

    onChange = (value) => {
        if (value === 100) {
            // 응답완료 시, initProgress 콜백 호출
            this.setState({
                active: false,
                progress: 0
            })
        } else {
            // progress 가 변할때마다 state 갱신
            this.setState({
                progress: value,
                active: true
            })
        }
    }

    initProgress = () => {
        setTimeout(() => {
            this.setState({
                active: false,
                progress: 0
            })
        }, 1000)
    }

    render() {
        return this.state.active  && (
            <div className="spinner"
             style={{
                 width: "100%",
                 height: "100",
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center",
                 top: "10%",
                 position:"fixed",
                 right: "0",
                 zIndex:"9999"
             }}
        >
            <Loader type="TailSpin"
                    color="#252830"
                    height={50} width={50} />
        </div>
        )
    }
}

export default LoaderSpinnerContainer