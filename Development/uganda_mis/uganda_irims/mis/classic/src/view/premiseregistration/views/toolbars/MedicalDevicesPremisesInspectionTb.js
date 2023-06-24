/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.premiseregistration.views.toolbars.MedicalDevicesPremisesInspectionTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'medicaldevicespremisesinspectiontb',
    ui: 'footer',
    defaults: {
        //arrowAlign: 'bottom',
        ui: 'soft-green',
        iconAlign: 'top'
    },//100 -- -- -- 1000
    requires: [
        'Ext.ux.BoxReorderer'
    ],
    plugins: 'boxreorderer',
    overflowHandler: 'scroller',
    items: [
        {
            text: 'Home',
            iconCls: 'x-fa fa-home',
            dashwrapper: 'medicaldevicespremisesinspectiondashwrapper',
            regdash:'medicaldevicespremisesinspectiondash',
            name: 'medicinespremisesinspectionHomeBtn'
        },
        {
            text: 'New Inspection',
            iconCls: 'x-fa fa-plus-square',
            handler: 'showNewPremiseInspectionSchedule',
            wrapper_xtype: 'medicaldevicespremisesinspectiondashwrapper',
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
            wrapper_xtype: 'medicaldevicespremisesinspectiondashwrapper',
            app_type: 50
        
        }
    ]
});