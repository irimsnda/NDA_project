/**
 * Created by Kip on 8/29/2018.
 */
Ext.define('Admin.view.usermanagement.views.panels.UserRolesAssignmentPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'userrolesassignmentpnl',
    layout: 'border',
    defaults: {
      /*  split: true,
        collapsible: true,
        titleCollapse: true*/
    },
    items: [{
        xtype: 'panel',
        margin: '2 0 2 0',
        region: 'center',
        width: '100%',
        title: 'Groups Assignment (To Assign: Drag from Left to Right) (To Remove: Drag from Right to Left)',
        resizable: true,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [
            {
                xtype: 'draggroupgrid',
                resizable: true,
                flex: 0.5,
                margin: '2 2 0 0',
                frame: true
            },
            {
                xtype: 'dropgroupgrid',
                flex: 0.5,
                resizable: true,
                margin: '2 0 0 2',
                frame: true
            }
        ]
    }, {
        xtype: 'panel',
        width: '100%',
        height: 250,
        margin: '0 0 2 0',
        hidden: true,
        region: 'south',
        title: 'Roles/Responsibilities Assignment (To Assign: Drag from Left to Right) (To Remove: Drag from Right to Left)',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [
            {
                xtype: 'dragrolegrid',
                flex: 0.5,
                margin: '2 2 0 0',
                frame: true
            },
            {
                xtype: 'droprolegrid',
                flex: 0.5,
                margin: '2 0 0 2',
                frame: true
            }
        ]
    }
    ]
});