$(window).on("load",function(){$(".main-wrapper").addClass("show")}),$(document).ready(function(){$(".b-custom-select").each(function(){var t=$(this).attr("class"),s=($(this).attr("id"),$(this).attr("name"),'<div class="'+t+'">');s+='<span class="b-custom-select-trigger">'+$(this).attr("placeholder")+"</span>",s+='<div class="custom-options">',$(this).find("option").each(function(){s+='<span class="custom-option '+$(this).attr("class")+'" data-value="'+$(this).attr("value")+'">'+$(this).html()+"</span>"}),s+="</div></div>",$(this).wrap('<div class="b-custom-select-wrapper"></div>'),$(this).hide(),$(this).after(s)}),$(".custom-option:first-of-type").hover(function(){$(this).parents(".custom-options").addClass("option-hover")},function(){$(this).parents(".custom-options").removeClass("option-hover")}),$(".b-custom-select-trigger").on("click",function(){$("html").one("click",function(){$(".b-custom-select").removeClass("opened")}),$(this).parents(".b-custom-select").toggleClass("opened"),event.stopPropagation()}),$(".custom-option").on("click",function(){$(this).parents(".b-custom-select-wrapper").find("select").val($(this).data("value")),$(this).parents(".custom-options").find(".custom-option").removeClass("selection"),$(this).addClass("selection"),$(this).parents(".b-custom-select").removeClass("opened"),$(this).parents(".b-custom-select").find(".b-custom-select-trigger").text($(this).text())})});