Ext.define('Admin.view.promotionmaterials.views.maininterfaces.panels.PromoAndAdvertManagerEvaluationPanel', {
    extend: 'Admin.view.promotionmaterials.views.maininterfaces.common.PromoAndAdvertWorkflowStagesInterfaceParent',
    xtype: 'promoandadvertmanagerevaluationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'promotionmaterialsmanagerevaluationgrid'
        }
    ]
});