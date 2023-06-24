/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.premiseregistration.views.toolbars.MedicinesPremisesInspectionTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'medicinespremisesinspectiontb',
    ui: 'footer',
    defaults: {
        //arrowAlign: 'bottom',
        ui: 'soft-green',
        iconAlign: 'top'
    },
    requires: [
        'Ext.ux.BoxReorderer'
    ],
    plugins: 'boxreorderer',
    overflowHandler: 'scroller',
    items: [
        {
            text: 'Home',
            iconCls: 'x-fa fa-home',
            name:'medicinespremisesinspectionHomeBtn',
            dashwrapper: 'medicinespremisesinspectiondashwrapper',
            regdash:'medicinespremisesinspectiondash',
        },
        {
            text: 'New Inspection',
            iconCls: 'x-fa fa-plus-square',
            handler: 'showNewPremiseRegistration',
            wrapper_xtype: 'medicinespremisesinspectiondashwrapper',
            app_type: 50
        },
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        },
        {
            text: 'Workflow',
            iconCls: 'x-fa fa-sitemap',
            handler: 'showPremiseRegWorkflow',
            wrapper_xtype: 'medicinespremisesinspectiondashwrapper',
            app_type: 50
        
        }
    ]
});