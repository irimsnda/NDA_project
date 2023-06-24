Ext.define('Admin.view.regional_assessment.views.panel.ProductRegionalAssessmentSetupCountryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'prodregionalassessmentsetupcountry',
    title: 'Product Regional Assessment Countries',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

   layout:{
        type: 'border'
    },
    defaults:{
        split: true,
        margin:1
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'category', //for either gmp or product
        value: 1
    }],
    items: [{
        xtype: 'regionalassessmentproceduresGrid',
        region: 'west'
    },{
        xtype: 'assessmentcountrygrid',
        region: 'center'
    }],

});