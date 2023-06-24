Ext.define('Admin.view.promotionmaterials.views.maininterfaces.panels.PromoAndAdvertEvaluationStageDocPanel', {
    extend: 'Admin.view.promotionmaterials.views.maininterfaces.common.PromoAndAdvertWorkflowStagesInterfaceParent',
    xtype: 'promoandadvertevaluationstagedocpanel',
    layout: 'fit',
    items: [
        {
            xtype:'promotionandadvertsdocsevaluationsubmit' //'promotionmaterialsdocuploadsgenericgrid'
        }
    ]
});