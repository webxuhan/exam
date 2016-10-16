/**
 * Created by 徐晗 on 2016/9/28.
 * 试卷模块
 */
angular.module("app.paperModule",["ng","app.subjectModule"])
    .controller("paperAddController",["$scope","commentService","paperModel","$routeParams","paperService",function ($scope,commentService,paperModel,$routeParams,paperService) {
        //将查询到的所有方向数据绑定到作用域中
        commentService.getAllDepartment(function (data) {
            $scope.departments=data;
        });
       $scope.model=paperModel.model;
        var id =$routeParams.id;
        if(id>0){
            paperModel.addSubjectId(id);
            paperModel.addSubject(angular.copy($routeParams));
        }
        //保存试卷
        paperService.savePaper($scope.model,function (data) {
            alert(data);
        });
    }])
    .controller("paperListController",["$scope","paperService",function ($scope,paperService) {
       //加载试卷信息
        paperService.loadPaper(function (data) {
            $scope.papermessage=data;
        });
    }])
    .factory("paperModel",function () {
        return{
            model:{
                dId:1,
                title:"",
                desc:"",
                tt:"",
                at:"",
                scores:[],
                subjectIds:[],
                subjects:[]
            },
            addSubjectId:function(id) {
                this.model.subjectIds.push(id);
            },
            addSubject:function (subject) {
                this.model.subjects.push(subject);
            },
            addScore:function (index,score) {
                this.model.scores[index]=score;
            }
        }
    })
    .service("paperService",["$http","$httpParamSerializer",function ($http,$httpParamSerializer) {
        //添加试卷
        this.savePaper=function (params,handler) {
            var obj={};
            for(var key in params){
                var val=params[key];
                switch(key){
                    case "dId":
                        obj['paper.department.id']=val;
                        break;
                    case "title":
                        obj['paper.title']=val;
                        break;
                    case "desc":
                        obj['paper.description']=val;
                        break;
                    case "tt":
                        obj['paper.totalPoints']=val;
                        break;
                    case "at":
                        obj['paper.answerQuestionTime']=val;
                        break;
                    case "scores":
                        obj['scores']=val;
                        break;
                    case "subjectIds":
                        obj['subjectIds']=val;
                        break;
                }
            }
            //将对象数据转换成表单样式编码的数据
            obj=$httpParamSerializer(obj);
            $http.post("http://172.16.0.5:7777/test/exam/manager/saveExamPaper.action",obj,{
                headers:{'Content-Type':'application/x-www-form-urlencoded'}
            });
        };
        //加载试卷
        this.loadPaper=function (handler) {
            $http.get("http://172.16.0.5:7777/test/exam/manager/getAllExamPapers.action").success(function (data) {
                handler(data);
            });
        }
    }])
;