/**
 * Created by Kip on 8/17/2018.
 */
Ext.define('Admin.view.usermanagement.views.forms.UsersWizardFrm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.userswizardfrm',
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
            xtype: 'userbasicinfofrm',
            itemId: 'basicuserform'
        },
        {
            xtype: 'userrolesassignmentpnl'
        },
        {
            xtype: 'hiddenfield',
            name: 'active_user_id'
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
                {
                    step: 1,
                    iconCls: 'fa fa-cogs',
                    enableToggle: true,
                    text: 'SYSTEM/DATA ACCESS',
                    action: 'quickNav',
                    handler: 'quickNavigation'
                }
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
                    currentPnlXtype: 'userspnl',
                    containerPnlXtype: 'activeuserspnl',
                    hiddenCompXtype: 'activeusersgrid',
                    containerType: 'userspnl',
                    ui: 'soft-purple',
                    handler: 'userBackToDashboardFromActiveUsers'
                },
                '->',
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    formBind: true,
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    action: 'next_user_card',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Save/Update User Information',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    ui: 'soft-purple',
                    handler: 'saveUserInformation'
                },
                {
                    text: 'Reset Password',
                    iconCls: 'x-fa fa-edit',
                    action: 'reset_pwd',
                    ui: 'soft-purple',
                    hidden: true,
                    handler: 'resetUserPassword',
                    name: 'reset_system_user_pwd'
                },
                {
                    text: 'Deactivate/Block',
                    iconCls: 'x-fa fa-lock',
                    action: 'block',
                    ui: 'soft-red',
                    hidden: true,
                    handler: 'deactivateSystemUser',
                    name: 'block_system_user'
                },
                {
                    text: 'Delete',
                    hidden: true,
                    iconCls: 'x-fa fa-trash',
                    action: 'delete',
                    ui: 'soft-red',
                    handler: 'deleteSystemUser',
                    name: 'delete_system_user'
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    formBind: true,
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },
                    action: 'next_user_card',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }

});
