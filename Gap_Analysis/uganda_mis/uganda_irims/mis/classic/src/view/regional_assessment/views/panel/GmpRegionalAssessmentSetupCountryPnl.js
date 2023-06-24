Ext.define('Admin.view.regional_assessment.views.panel.GmpRegionalAssessmentSetupCountryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmpregionalassessmentsetupcountry',
    title: 'GMP Regional Assessment Countries',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'category', //for either gmp or product
        value: 2
    }],
   layout:{
        type: 'border'
    },
    defaults:{
        split: true,
        margin:1
    },
    items: [{
        xtype: 'gmpregionalassessmentproceduresGrid',
        region: 'west'
    },{
        xtype: 'gmpassessmentcountrygrid',
        region: 'center'
    }],

});