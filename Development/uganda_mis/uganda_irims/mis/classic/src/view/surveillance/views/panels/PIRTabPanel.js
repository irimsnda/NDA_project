/**
 * Created by Kip on 3/13/2019.
 */
Ext.define('Admin.view.surveillance.views.panels.PIRTabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'pirtabpanel',
    height: 550,
    items: [
        {//0
            title: 'Sample Information',
            xtype: 'pirsampledetailstabpanel'
        },
        {//1
            title: 'Product Information Review',
            xtype: 'pmspirevaluationgrid',
            hidden: true
        },
        {//2
            title: 'Sample Screening Laboratory Results',
            xtype: 'labscreeningresultsgrid',
            hidden: true
        },
        {//3
            title: 'Sample Conformatory Analysis Laboratory Results',
            xtype: 'labanalysisresultsgrid',
            hidden: true
        }
    ]
});