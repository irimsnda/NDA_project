
Ext.define('Admin.view.usermanagement.views.forms.ApiUsersWizardFrm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.apiuserswizardfrm',
    padding: '2 0 2 0',
    //controller: 'usermanagementvctr',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],

    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    /* viewModel: {
         type: 'usermanagementvm'
     },*/

    autoScroll: true,

    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    items: [
        {
            xtype: 'apiuserbasicinfofrm',
            itemId: 'apibasicuserform'
        },
        {
            xtype: 'hiddenfield',
            name: 'api_user_id'
        }
    ],

    initComponent: function () {
        var me = this;

        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            bodyStyle: {
                "background-color": "red"
            },
            layout: {
                pack: 'center'
            },
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-user',
                    pressed: true,
                    enableToggle: true,
                    text: 'BASIC USER INFO',
                    action: 'quickNav',
                    handler: 'quickNavigation'
                },
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Home',
                    iconCls: 'x-fa fa-backward',
                    action: 'back',
                    currentPnlXtype: 'apiusersFrmpnl',
                    containerPnlXtype: 'apiuserspnl',
                    hiddenCompXtype: 'apiusersgrid',
                    containerType: 'apiusersFrmpnl',
                    ui: 'soft-purple',
                    handler: 'userBackToDashboardFromActiveUsers'
                },
                '->',
                {
                    text: 'Save/Update User Information',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    ui: 'soft-purple',
                    handler: 'saveApiUserInformation'
                },
                {
                    text: 'Deactivate/Block',
                    iconCls: 'x-fa fa-lock',
                    action: 'block',
                    ui: 'soft-red',
                    hidden: true,
                    handler: 'deactivateSystemApiUser',
                    name: 'block_system_user'
                },
                {
                    text: 'Delete',
                    hidden: true,
                    iconCls: 'x-fa fa-trash',
                    action: 'delete',
                    ui: 'soft-red',
                    handler: 'deleteSystemApiUser',
                    name: 'delete_system_user'
                },
            ]
        };
        me.callParent(arguments);
    }

});
