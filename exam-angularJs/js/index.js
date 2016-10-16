/**
 * Created by 徐晗 on 2016/9/22.
 * 项目的核心js
 */

//左侧导航动画
$(function () {
    //收缩全部
    $(".baseUI>li>ul").slideUp("fast");

    $(".baseUI>li>a").off("click");
    $(".baseUI>li>a").on("click",function () {
        $(".baseUI>li>ul").slideUp("fast");
        $(this).next().slideDown();
    });
    //默认让第一个展开
    $(".baseUI>li>a").eq(0).trigger("click");

    //背景改变
    $(".baseUI ul>li").off("click");
    $(".baseUI ul>li").on("click",function () {
        if(!$(this).hasClass("current")){
            $(".baseUI ul>li").removeClass("current");
            $(this).addClass("current");
        }
    });
    $(".baseUI ul>li").eq(0).find("a").trigger("click");
});
//项目核心模块
angular.module("app",["ng","ngRoute","app.subjectModule","app.paperModule"])
    .controller("mainController",["$scope",function ($scope) {

    }])
    .config(["$routeProvider",function ($routeProvider) {
        $routeProvider.when("/SubjectList/dpId/:dpId/topicId/:topicId/levelId/:levelId/typeId/:typeId",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectController"
        }).when("/SubjectManger",{
            templateUrl:"tpl/subject/subjectManger.html",
            controller:"subjectController"
        }).when("/subject/add",{
            templateUrl:"tpl/subject/subject_add.html",
            controller:"subjectController"
        }).when("/subjectDel/id/:id",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectDelController"
        }).when("/subjectCheck/id/:id/state/:state",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"checkSubjectController"
        }).when("/paperList",{
            templateUrl:"tpl/paper/paperManger.html",
            controller:"paperListController"
        }).when("/paperAdd",{
                templateUrl:"tpl/paper/paperAdd.html",
                controller:"paperAddController"
        }).when("/paperAddSubject",{
            templateUrl:"tpl/paper/subjectList.html",
            controller:"subjectController"
        }).when("/PaperAdd/id/:id/stem/:stem/type/:type/topic/:topic/level/:level",{
            templateUrl:"tpl/paper/paperAdd.html",
            controller:"paperAddController"
        }).when("/savePaper/dId/:dId/title/:title/desc/:desc/tt/:tt/at/:at",{
            templateUrl:"tpl/paper/paperManger.html",
            controller:"paperListController"
        });
    }]);