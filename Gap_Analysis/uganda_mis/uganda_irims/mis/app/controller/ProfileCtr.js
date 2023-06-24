/**
 * Created by Kip on 6/26/2019.
 */
Ext.define('Admin.controller.ProfileCtr', {
    extend: 'Ext.app.Controller',
    stores: [],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        }],

        control: {
            '#userProfile': {
                click: 'showUserProfile'
            },
            '#notifications_btn': {
                click: 'showUserProfileNotifications'
            },
            'profile': {
                afterrender: 'afterProfileRender'
            }
        }
    },

    /**
     * Called when the view is created
     */
    init: function () {

    },

    showUserProfile: function () {
        var me = this,
            mainPanel = this.getMainPanel(),
            mainTabPanel = mainPanel.down('#contentPanel'),
            profileTab = mainTabPanel.getComponent('user_profile');
        if (!profileTab) {
            mainTabPanel.add({
                xtype: 'profile',
                closable: true,
                title: 'My Profile',
                id: 'user_profile'
            });
        }
        mainTabPanel.setActiveTab('user_profile');
    },

    showUserProfileNotifications: function () {
        var me = this,
            mainPanel = this.getMainPanel(),
            mainTabPanel = mainPanel.down('#contentPanel'),
            profileTab = mainTabPanel.getComponent('user_profile'),
            mainAppView = this.mainTabPanel(),
            notification_icon = mainAppView.down('button[name=notifications_btn]');
        notification_icon.setText('');
        Ext.Ajax.request({
            method: 'POST',
            url: 'usermanagement/updateUserNotifications',
            params: {
                _token: token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                console.log(message);
            },
            failure: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message;
                console.log(message);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        if (!profileTab) {
            mainTabPanel.add({
                xtype: 'profile',
                closable: true,
                title: 'My Profile',
                id: 'user_profile'
            });
        }
        mainTabPanel.setActiveTab('user_profile');
    },

    afterProfileRender: function (pnl) {
        Ext.getStore('usershareditems_str').load();
        Ext.getStore('usersStore').load();
        Ext.getStore('usermessages_str').load();
    },

    userNotificationsChecker: function () {
        var me = this,
            mainPanel = this.getMainPanel(),
            mainTabPanel = mainPanel.down('#contentPanel'),
            profileTab = mainTabPanel.getComponent('user_profile');
        if (profileTab) {
            var messages = profileTab.down('profiletimeline'),
                messages_store = messages.getStore(),
                updates = profileTab.down('profilenotifications'),
                updates_store = updates.getStore();
            messages_store.load();
            updates_store.load();
        }
    }

});