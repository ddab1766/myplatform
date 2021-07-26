import React from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {renderError, renderRatingField, renderTextAreaField} from "../../utils/renderUtils";
import {updateSugubReview} from "../../actions/ReviewActions";
import {Spinner} from "reactstrap";
import {getUserProfile} from "../../actions/authActions";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import history from "utils/historyUtils";

const SugubReviewForm = (props) => {
    const {handleSubmit, error, submitting, comCode, sugubid} = props;
    // console.log('SugubReviewForm comCode', comCode)
    return(
        <div>
            <Card>
                <CardContent>
                    <Typography>
                        리뷰<br/>
                        <small>리뷰를 작성한 뒤에는 리뷰의 수정이 불가능합니다. 신중하게 작성해주세요.</small>
                    </Typography>
                    <hr/>
                    <form
                        className="mx-1"
                        onSubmit={handleSubmit}
                    >
                        {comCode.map((v, index) => {
                            return (
                                <>
                                    <label>{v.code_name}</label>
                                    <fieldset className="form-group">
                                        <Field name={`${v.code_id}`} label="별점" component={renderRatingField}
                                               type="text"
                                        />
                                    </fieldset>
                                </>
                            )
                        })}

                        <fieldset className="form-group">
                            <Field name="review_comment" label="" component={renderTextAreaField}
                                   type="text" placeholder="리뷰를 남겨주세요"
                            />
                        </fieldset>
                        {renderError(error)}
                        <button action="submit" className="btn btn-primary pull-right" disabled={submitting}>
                            {submitting === true && (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />)
                            }
                            <span className="btn-label">
                          <i className="nc-icon nc-check-2" />
                        </span>
                            리뷰남기기
                        </button>
                        <br/>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
};

function mapStateToProps(state, props) {
    return {
        initialValues: {
            sugub: props.sugubid
        }
    }
}

export default connect(mapStateToProps, {getUserProfile})(reduxForm({
    form: "update_sugubReview",
    onSubmitSuccess: () => {
      history.goBack()
    },
    onSubmit: updateSugubReview
})(SugubReviewForm));

// export default SugubReviewForm