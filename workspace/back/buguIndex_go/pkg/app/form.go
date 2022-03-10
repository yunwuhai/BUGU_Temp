/**
 * @Author: Anpw
 * @Description:
 * @File:  form
 * @Version: 1.0.0
 * @Date: 2021/5/26 21:15
 */

package app

import (
	"github.com/gin-gonic/gin"
	ut "github.com/go-playground/universal-translator"
	val "github.com/go-playground/validator/v10"
	"strings"
)

type ValidError struct {
	Key string
	Message string
}

type ValidErrors []*ValidError

func (v *ValidError) Error() string {
	return v.Message
}

func (v ValidErrors) Error() string {
	return strings.Join(v.Errors(),",")
}

func (v ValidErrors) Errors() []string {
	var errs []string
	for _, err := range v{
		errs = append(errs, err.Error())
	}
	return errs
}

func BindAndValid(c *gin.Context,v interface{}) (bool, ValidErrors) {
	var errs ValidErrors
	err := c.ShouldBind(v)
	if err != nil {
		v := c.Value("trans")
		trans, _ := v.(ut.Translator)
		verrs, ok :=err.(val.ValidationErrors)
		if !ok {
			return false, nil
		}

		for key, value := range verrs.Translate(trans) {
			errs = append(errs,&ValidError{
				Key:     key,
				Message: value,
			})
		}
		return true, errs
	}
	return false, nil
}
 