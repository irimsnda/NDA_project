Ext.define('Admin.view.promotionmaterials.views.maininterfaces.panels.PromotionAdvertsEvaluationCommentsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'promotionadvertsevaluationcommentspnl',
    controller: 'promotionmaterialviewcontroller',
    frame: true,
    items: [
        
        {
            xtype: 'form',
            bodyPadding: 5,
            layout: 'form',
            hidden: true,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'id'
                },
                {
                    xtype: 'textarea',
                    name: 'comment',
                    emptyText: 'Your comment...',
                    allowBlank: false
                },
				{
				   xtype: 'hiddenfield',
				   name: 'comment_type_id',
				   value:2
				}
            ],
            buttons: [
			
			 /*   {
				xtype: 'button',
				text: 'Save Details',
				ui: 'soft-purple',
				iconCls: 'x-fa fa-save',
				formBind: true,
				table_name: 'tra_promotion_materials_details',
				storeID: 'promotionmaterialdetailstr',
				action_url: 'promotionmaterials/insertUpdateProductParticulars',
				action: 'save_promotion_materials_other_details'
				 }, */
               {
                    xtype: 'button',
                    text: 'Save Comment',
					storeID: 'evaluationcommentsstr',
                    ui: 'soft-purple',
                    name: 'save_comment',
                    iconCls: 'x-fa fa-save',
                    formBind: true
                }, 
                {
                    text: 'Cancel',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-close',
                    handler: 'cancelAddApplicationEvaluationComment'
                }
            ]
        },
        {
            xtype: 'promotionadvertsevaluationcommentsgrid'//'evaluationcommentsgrid'
        } 
    ]
});